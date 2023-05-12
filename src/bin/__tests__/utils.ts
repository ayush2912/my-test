import { loadDataFromCSV } from '../utils';

const string = `registry,engagement_type,task_type
GCC,Registration,Project Signed
GCC,Registration,Document Collection
`;

test('loadDataFromCSV()', () => {
    const results = loadDataFromCSV(string);

    expect(results).toEqual([
        {
            registry: 'GCC',
            engagement_type: 'Registration',
            task_type: 'Project Signed',
        },
        {
            registry: 'GCC',
            engagement_type: 'Registration',
            task_type: 'Document Collection',
        },
    ]);
});
