import * as yup from 'yup';

yup.setLocale({
  mixed: {
    default: 'Campo inválido',
    required: 'Campo obrigatório',
    notOneOf: 'Campo não pode ser um dos seguintes valores: ${values}',
    oneOf: 'Campo deve ser um dos seguintes valores: ${values}',
  },
  string: {
    length: 'Campo deve ter exatamente ${length} caracteres',
    min: 'Campo deve ter pelo menos ${min} caracteres',
    max: 'Campo deve ter no máximo ${max} caracteres',
    email: 'Campo deve ser um e-mail válido',
    url: 'Campo deve ser uma URL válida',
    trim: 'Campo não deve conter espaços no início ou no fim',
  },
  number: {
    min: 'Campo deve ser no mínimo ${min}',
    max: 'Campo deve ser no máximo ${max}',
    positive: 'Campo deve ser um número positivo',
    integer: 'Campo deve ser um número inteiro',
    moreThan: 'Campo deve ser maior que ${more}',
    lessThan: 'Campo deve ser menor que ${less}',
  },
  date: {
    min: 'Campo deve ser uma data posterior a ${min}',
    max: 'Campo deve ser uma data anterior a ${max}',
  },
});
