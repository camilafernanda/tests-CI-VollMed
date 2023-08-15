import * as Yup from 'yup';

const estadosValidos = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

export let pacienteSchema = Yup.object().shape({
    email: Yup.string().required('O email é obrigatório').matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Insira um email válido!'),
    endereco: Yup.object().shape({
        estado: Yup.string().oneOf(estadosValidos, 'Insira um estado brasileiro!')
    })
})