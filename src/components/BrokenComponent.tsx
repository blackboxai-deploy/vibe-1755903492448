import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { NonExistentComponent } from './NonExistent';

interface BrokenProps {
  title: string;
  count?: number;
  data: Array<string>;
  callback: (id: number) => void;
}

const BrokenComponent: React.FC<BrokenProps> = ({ title, count, data, callback }) => {
  const [state, setState] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/nonexistent');
        const result = await response.json();
        setState(result.data);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    callback(state);
    setState(undefined);
  };

  const processData = (items: string[]) => {
    return items.map((item, index) => {
      if (item.length > 0) {
        return item.toUpperCase();
      }
      return null;
    });
  };

  const renderItems = () => {
    if (data && data.length > 0) {
      return data.map((item) => (
        <div key={item.id} className="item">
          <span>{item.name}</span>
          <Button onClick={() => callback(item)}>
            {item.status ? 'Active' : 'Inactive'}
          </Button>
        </div>
      ));
    }
    return <div>No data available</div>;
  };

  return (
    <div className="broken-component">
      <h2>{title}</h2>
      <p>Count: {count + 1}</p>
      
      {loading && <div>Loading...</div>}
      
      <NonExistentComponent prop1={state} prop2={count} />
      
      <div className="content">
        {state.length > 0 && (
          <div>
            <span>{state.toUpperCase()}</span>
          </div>
        )}
        
        {renderItems()}
        
        <Button 
          onClick={handleClick}
          disabled={!state}
          variant="destructive"
        >
          Process Data
        </Button>
      </div>
      
      <div className="processed-data">
        {processData(data).map((item, idx) => (
          <span key={idx}>{item}</span>
        ))}
      </div>
    </div>
  );
};

export default BrokenComponent;