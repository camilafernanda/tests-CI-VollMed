USE testemed;
DELETE FROM paciente WHERE cpf IN ('78160552009', '12345678901');
INSERT INTO paciente (id, cpf, nome, email, estaAtivo, senha, telefone, possuiPlanoSaude, planosSaude, historico, role)
VALUES 
  (uuid(), '78160552009', 'Emerson Laranja', 'emerson@email.com', true, 'Senh@forte123', '34999335522', true, '[2]', "['sinusite,moderado']", 'PACIENTE'),
  (uuid(), '12345678901', 'Joana Silva', 'joana@email.com', true, 'MinhaSenha123', '34999887766', true, '[1, 3]', "['rinite,leve', 'asma,médio']", 'PACIENTE');
SELECT 
CONCAT('KILL ', id, ';') 
FROM INFORMATION_SCHEMA.PROCESSLIST 
WHERE User = 'root' 
AND Host = 'db'
AND db = 'testemed';