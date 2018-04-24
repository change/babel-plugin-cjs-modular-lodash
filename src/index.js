module.exports = ({
  types: t
}) => {

  return {
    visitor: {
      MemberExpression(path) {
        const { node: { object, property } } = path;
        if (object.name === '_') {
          const lodashMethodName = property.name;
          path.replaceWith(t.identifier(`_${lodashMethodName}`));
        }
      },
    },
  };
};
