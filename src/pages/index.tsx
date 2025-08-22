import React from 'react';
import { GetServerSideProps } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HomeProps {
  data: {
    title: string;
    count: number;
  };
}

const HomePage: React.FC<HomeProps> = ({ data }) => {
  const [count, setCount] = React.useState<number>(data.count);
  
  // This will cause a build error - undefined variable
  const handleClick = () => {
    setCount(count + undefinedVariable);
  };

  // This will cause a TypeScript error - wrong type
  const invalidTypeUsage: string = 123;

  // This will cause a build error - missing import
  const router = useRouter();

  return (
    <div className="container mx-auto p-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Current count: {count}</p>
          <Button onClick={handleClick} className="w-full">
            Increment Count
          </Button>
          <div className="mt-4">
            <p>Invalid type value: {invalidTypeUsage}</p>
          </div>
          {/* This will cause a build error - component doesn't exist */}
          <NonExistentComponent />
        </CardContent>
      </Card>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // This will cause a runtime error - accessing undefined property
  const invalidAccess = context.req.nonExistentProperty.value;
  
  return {
    props: {
      data: {
        title: 'Build Issues Test Page',
        count: 0,
      },
    },
  };
};

export default HomePage;