module.exports = ({ types: t }) => {
  const getMethodIdentifier = lodashMethodName => t.identifier(`_${lodashMethodName}`);
  let lodashMethodsUsed;

  return {
    visitor: {
      MemberExpression(path) {
        const {
          node: { object, property },
        } = path;

        if (object.name !== '_') return;

        const lodashMethodName = property.name;
        path.replaceWith(getMethodIdentifier(lodashMethodName));
        if (lodashMethodsUsed.indexOf(lodashMethodName) < 0) lodashMethodsUsed.push(lodashMethodName);
      },

      Program: {
        enter() {
          lodashMethodsUsed = [];
        },

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
