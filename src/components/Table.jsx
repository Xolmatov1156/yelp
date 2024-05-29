import React from "react";

const Table = ({ itemList, userId }) => {
  return (
    <div className="table-responsive">
      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th>Hotel Name</th>
            <th>Description</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {itemList &&
            itemList.map((item, index) => {
              if (userId === item.userId) {
                return (
                  <tr key={index}>
                    
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.city}</td>
                  </tr>
                );
              }
              return null;
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
