import React from 'react';

const LearnTab: React.FC = () => {
  const formulas = [
    {
      id: 1,
      title: '(a + b)² = a² + 2ab + b²',
      example: 'Ví dụ: (x + 3)² = x² + 6x + 9',
    },
    {
      id: 2,
      title: '(a − b)² = a² − 2ab + b²',
      example: 'Ví dụ: (x − 2)² = x² − 4x + 4',
    },
    {
      id: 3,
      title: 'a² − b² = (a − b)(a + b)',
      example: 'Ví dụ: x² − 9 = (x − 3)(x + 3)',
    },
    {
      id: 4,
      title: '(a + b)³ = a³ + 3a²b + 3ab² + b³',
      example: 'Ví dụ: (x + 1)³ = x³ + 3x² + 3x + 1',
    },
    {
      id: 5,
      title: '(a − b)³ = a³ − 3a²b + 3ab² − b³',
      example: 'Ví dụ: (x − 1)³ = x³ − 3x² + 3x − 1',
    },
    {
      id: 6,
      title: 'a³ + b³ = (a + b)(a² − ab + b²)',
      example: 'Ví dụ: x³ + 8 = (x + 2)(x² − 2x + 4)',
    },
    {
      id: 7,
      title: 'a³ − b³ = (a − b)(a² + ab + b²)',
      example: 'Ví dụ: x³ − 27 = (x − 3)(x² + 3x + 9)',
    },
  ];

  return (
    <div className="mt-[70px] bg-[#141c2f] rounded-2xl p-4 shadow-lg"> {/* Adjust margin-top to clear fixed header */}
      <h3 className="text-xl font-bold mb-4">📘 7 HẰNG ĐẲNG THỨC</h3>

      {formulas.map((formula) => (
        <div key={formula.id} className="bg-[#0f1630] rounded-xl p-3 mb-3">
          <b className="text-[#eef1ff]">{formula.id}.</b>{' '}
          <span className="text-[#eef1ff]">{formula.title}</span>
          <div className="text-sm text-[#cde1ff] mt-1">{formula.example}</div>
        </div>
      ))}
    </div>
  );
};

export default LearnTab;