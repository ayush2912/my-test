import { parseProjectTypes } from '../parse';
import { seedProjectTypes } from '../seed';

test('seedProjectTypes()', async () => {
    const data = parseProjectTypes([
        {
            Name: 'Hybrid',
            ParentType: 'Renewable Energy',
        },
        {
            Name: 'Renewable Energy',
            ParentType: '',
        },
    ]);

    const { parentTypes, subTypes } = await seedProjectTypes(data);

    expect(parentTypes).toEqual([
        expect.objectContaining({
            name: 'Renewable Energy',
        }),
    ]);

    expect(subTypes).toEqual([
        expect.objectContaining({
            name: 'Hybrid',
            parentId: parentTypes.find((p) => p.name === 'Renewable Energy')
                ?.id,
        }),
    ]);
});
