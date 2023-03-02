const PokemonPageLayout = ({ children }) => {
  return (
    <div className="flex">
        
      <div className="inner">
        <h1>DashBoard</h1>
      </div>

      <style jsx>{`
        .flex {
          display: flex;
          justify-content: space-between;
        }

        .inner {
          /* height: 200px; */
          background: #b811ad;
        }
      `}</style>

      {children}
    </div>
  );
};

export default PokemonPageLayout;
