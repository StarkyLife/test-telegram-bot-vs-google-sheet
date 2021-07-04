import { getValuesData, updateValues } from './google';

test.skip('google api with finance', async () => {
    const data = await getValuesData(
        '1ikckSY1y7ZmtIjgty5CNkxfkVu0rJpvdSy-sALUxWw8',
        'Справочник!B6:B',
    );

    expect(data.values).toEqual([
        ['Поступления от клиентов'],
        ['Прочие поступления'],
        ['Займы полученные'],
        ['Маркетинг'],
        ['ФОТ 1'],
        ['ФОТ 2'],
    ]);
});

test.skip('google api writing', async () => {
    const response = await updateValues(
        '1E-GjS5ShMi8XhtimLoLrcuHvej4esRTcEg6V21GQvyw',
        'Sheet1!B2',
        [
            ['first cell', 'second cell'],
            ['another row', 'yet another row cell'],
        ],
    );

    expect(response.status).toBe(200);
});

test.skip('google api writing to cell with select', async () => {
    const response = await updateValues(
        '1ikckSY1y7ZmtIjgty5CNkxfkVu0rJpvdSy-sALUxWw8',
        'Учет финансов',
        [
            [
                '01.07.2021',
                '03.07.2021',
                true,
                '',
                'Надежда',
                'Поступления от клиентов',
                'Тиньков',
                '',
                'подрядчик',
                '5000',
                'comment',
            ],
        ],
    );

    expect(response.status).toBe(200);
});
