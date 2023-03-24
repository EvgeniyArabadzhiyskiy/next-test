const NestedLayout = ({children}) => {
  return (
    <div className="layout">
      <h1 className="title">Nested Layout</h1>

      {children}

      <style jsx>{`
        .layout {
          /* height: 200px; */
          background: #a95748;
          /* display: flex;
          justify-content: space-between; */
        }

        .title {
          color: #c12adf;
          
        }
      `}</style>
    </div>
  );
};

export default NestedLayout;
