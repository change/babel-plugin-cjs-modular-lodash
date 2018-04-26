module.exports = ({ types: t }) => {
  const getMethodIdentifier = lodashMethodName => t.identifier(`_lodash_${lodashMethodName}`);
  let lodashMethodsUsed;

  return {
    visitor: {
      Program: {
        enter({ hub: { file } }) {
          lodashMethodsUsed = [];
          file.path.traverse({
            // Finds uses of _.method and replaces them with _lodash_method,
            // and records which methods were used in a file so that require
            // statements can be prepended to the file
            MemberExpression(path) {
              const {
                node: { object, property },
              } = path;

              if (object.name !== '_') return;

              const lodashMethodName = property.name;
              path.replaceWith(getMethodIdentifier(lodashMethodName));
              if (lodashMethodsUsed.indexOf(lodashMethodName) < 0) lodashMethodsUsed.push(lodashMethodName);
            },

            // Remove uses of `const _ = require('lodash')`
            VariableDeclarator(path) {
              const {
                node: {
                  id: { name },
                  init,
                },
              } = path;

              if (name !== '_') return;
              if (!t.isCallExpression(init)) return;
              if (init.callee.name !== 'require') return;
              if (!init.arguments) return;
              if (init.arguments[0].value !== 'lodash') return;

              // if the method hasn't exited, this node is a require of lodash as _
              path.remove();
            },
          });
        },

        // add the require statements for individual lodash methods
        // to the beginning of the file
        exit(path) {
          const requireDeclarations = lodashMethodsUsed.map(lodashMethodName =>
            t.variableDeclaration('const', [
              t.variableDeclarator(
                getMethodIdentifier(lodashMethodName),
                t.callExpression(t.identifier('require'), [t.stringLiteral(`lodash/${lodashMethodName}`)])
              ),
            ])
          );

          path.unshiftContainer('body', requireDeclarations);
        },
      },
    },
  };
};
