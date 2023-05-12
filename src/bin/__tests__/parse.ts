import { parseProjectTypes } from '../parse';

test('parseProjectTypes()', () => {
    const data = [
        {
            Name: 'Solar Water Heaters',
            ParentType: 'Renewable Energy',
        },
        {
            Name: 'Wind',
            ParentType: 'Renewable Energy',
        },
        {
            Name: 'Hybrid',
            ParentType: 'Renewable Energy',
        },
        {
            Name: 'Bicycles',
            ParentType: '',
        },
        {
            Name: 'Electric Vehicles & Charging',
            ParentType: '',
        },
    ];

    const results = parseProjectTypes(data);

    expect(results).toEqual([
        {
            name: 'Solar Water Heaters',
            parentType: 'Renewable Energy',
        },
        {
            name: 'Wind',
            parentType: 'Renewable Energy',
        },
        {
            name: 'Hybrid',
            parentType: 'Renewable Energy',
        },
        {
            name: 'Bicycles',
            parentType: '',
        },
        {
            name: 'Electric Vehicles & Charging',
            parentType: '',
        },
    ]);
});
