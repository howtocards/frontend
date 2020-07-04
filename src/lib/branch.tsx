import * as React from 'react';

interface BranchProps {
  if: boolean;
}

export const Branch: React.FC<BranchProps> = ({ if: value, children }) => {
  const [thenBranch, elseBranch, ...another] = React.Children.toArray(children);
  const result = value ? thenBranch : elseBranch;

  if (another.length > 0) {
    throw new TypeError(
      'You passed more than two children to Branch. Maybe you forgot to wrap multiple children to <React.Fragment /> ?',
    );
  }
  return <>{result}</> || null;
};
