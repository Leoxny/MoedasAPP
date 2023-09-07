import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Picker } from '../components/picker';
import { ApiMoeda } from '../api/ApiMoeda';
import { CustomActivityIndicator } from '../components/ActivityIndicator';
import { message } from '../utils/Toast';

export const Moeda = () => {

    const [moedas, setMoedas] = useState([]);
    const [loading, setLoading] = useState(false)
    const [moedaSelecionado, setMoedaSelecionado] = useState(null)
    const [moedaBValor, setMoedaBValor] = useState(0)
    const [valorMoeda, setValorMoeda] = useState(null)
    const [valorConvertida, setValorConvertida] = useState(0)

    useEffect(() => {
        getMoeda();
    }, [])

    async function getMoeda() {
        try {
            setLoading(true);

            const response = await ApiMoeda.getAll();

            let arrayMoedas = [];

            Object.keys(response.data).map((key) => {
                arrayMoedas.push({
                    key: key,
                    label: key,
                    value: key
                })
            })

            setMoedas(arrayMoedas)

            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    }

    async function converter() {
        if (moedaSelecionado === null || moedaBValor === 0) {
            message('Atenção', 'Selecione uma moeda')
            return;
        }

        const response = await ApiMoeda.getMoeda(moedaSelecionado)

        let resultado = (response.data[moedaSelecionado].ask * parseFloat(moedaBValor));
        setValorConvertida(`R$ ${resultado.toFixed(2)}`)
        setValorMoeda(moedaBValor)

        Keyboard.dismiss();
    }

    return (
        <>
            {loading ?
                <CustomActivityIndicator />
                :
                <View style={styles.container}>
                    <View style={styles.areaMoeda}>
                        <Text style={styles.titulo}>Selecione sua moeda</Text>
                        <Picker moedas={moedas} onChange={(moeda) => setMoedaSelecionado(moeda)} />
                    </View>

                    <View style={styles.areaValor}>
                        <Text style={styles.titulo}>Digite um valor para convereter em (R$)</Text>
                        <TextInput
                            placeholder='EX: 150'
                            style={styles.input}
                            keyboardType='numeric'
                            onChangeText={(valor) => setMoedaBValor(valor)}
                        />
                    </View>

                    <TouchableOpacity style={styles.botaoArea} onPress={converter}>
                        <Text style={styles.botaoTexto}>Converter</Text>
                    </TouchableOpacity>

                    {valorConvertida !== 9 &&
                        <View style={styles.areaResultado}>
                            <Text style={styles.resultadoTexto}>{valorMoeda} {moedaSelecionado}</Text>
                            <Text style={[styles.resultadoTexto, { fontSize: 18, margin: 10 }]}>Corresponde a</Text>
                            <Text style={styles.resultadoTexto}>{valorConvertida}</Text>
                        </View>
                    }

                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#101215',
        paddingTop: 40
    },
    areaMoeda: {
        width: '90%',
        backgroundColor: '#f9f9f9',
        paddingTop: 9,
        borderTopLeftRadius: 9,
        borderTopRightRadius: 9,
        marginBottom: 1
    },
    titulo: {
        fontSize: 15,
        color: '#000',
        paddingTop: 5,
        paddingLeft: 5
    },
    areaValor: {
        width: '90%',
        backgroundColor: '#f9f9f9',
        paddingBottom: 9,
        paddingTop: 9
    },
    input: {
        width: 100,
        padding: 10,
        height: 45,
        fontSize: 20,
        marginTop: 8,
        color: '#000'
    },
    botaoArea: {
        width: '90%',
        backgroundColor: '#fb4b57',
        borderBottomLeftRadius: 9,
        borderBottomRightRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        height: 45
    },
    botaoTexto: {
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold'
    },
    areaResultado: {
        width: '90%',
        backgroundColor: '#fff',
        marginTop: 35,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25
    },
    resultadoTexto: {
        fontSize: 39,
        color: '#000',
        fontWeight: 'bold'
    }
});
