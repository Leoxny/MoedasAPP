import React, { FC } from 'react';
import RNPickerSelect from 'react-native-picker-select';

interface Props {
    onChange: (value: string) => void;
    moedas: any
}

export const Picker: FC<Props> = ({ onChange, moedas }) => {

    const placeholder = {
        label: 'Selecione uma moeda...',
        value: null,
        color: '#000000',
    }
    return (
        <RNPickerSelect
            placeholder={placeholder}
            items={moedas}
            onValueChange={(value) => onChange(value)}
            style={{
                inputIOS: {
                    fontSize: 15,
                    color: '#000000',
                },
                inputAndroid: {
                    fontSize: 15,
                    color: '#000000',
                }
            }}
        />
    );
};



