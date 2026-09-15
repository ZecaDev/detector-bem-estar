import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Smile, Meh, Frown, HeartPulse, UserCheck, BarChart3, RotateCcw } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('aluno');
  const [diaAtual, setDiaAtual] = useState('Seg');

  // Histórico zerado com suporte para a opção 'Normal'
  const estadoInicial = {
    Seg: { felicidade: 0, normal: 0, ansiedade: 0, votos: 0 },
    Ter: { felicidade: 0, normal: 0, ansiedade: 0, votos: 0 },
    Qua: { felicidade: 0, normal: 0, ansiedade: 0, votos: 0 },
    Qui: { felicidade: 0, normal: 0, ansiedade: 0, votos: 0 },
    Sex: { felicidade: 0, normal: 0, ansiedade: 0, votos: 0 },
  };

  const [historicoVotos, setHistoricoVotos] = useState(estadoInicial);
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  // Registra cada clique somando à respectiva emoção
  const registrarEmocao = (tipo) => {
    setHistoricoVotos((prev) => {
      const dia = prev[diaAtual];
      return {
        ...prev,
        [diaAtual]: {
          ...dia,
          felicidade: tipo === 'bem' ? dia.felicidade + 1 : dia.felicidade,
          normal: tipo === 'normal' ? dia.normal + 1 : dia.normal,
          ansiedade: tipo === 'ruim' ? dia.ansiedade + 1 : dia.ansiedade,
          votos: dia.votos + 1,
        },
      };
    });

    setMensagemSucesso(`Voto "Normal" registrado para ${diaAtual}-feira! Veja a atualização no Painel.`);
    setTimeout(() => setMensagemSucesso(''), 4000);
  };

  // Formata os dados para o gráfico e para a tabela
  const dadosFormatados = Object.keys(historicoVotos).map((dia) => ({
    data: dia,
    felicidade: historicoVotos[dia].felicidade,
    normal: historicoVotos[dia].normal,
    ansiedade: historicoVotos[dia].ansiedade,
    votos: historicoVotos[dia].votos,
  }));

  const resetarDados = () => {
    setHistoricoVotos(estadoInicial);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f8', minHeight: '100vh', padding: '20px' }}>
      {/* Cabeçalho */}
      <header style={{ backgroundColor: '#0288d1', color: '#fff', padding: '15px 20px', borderRadius: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <h2><HeartPulse style={{ verticalAlign: 'middle', marginRight: '8px' }} /> SentirBem Escolar - RJ</h2>
        <div>
          <button 
            onClick={() => setActiveTab('aluno')} 
            style={{ padding: '8px 16px', marginRight: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'aluno' ? '#fff' : '#0277bd', color: activeTab === 'aluno' ? '#0288d1' : '#fff', fontWeight: 'bold' }}
          >
            <UserCheck size={16} /> Área do Aluno
          </button>
          <button 
            onClick={() => setActiveTab('escola')} 
            style={{ padding: '8px 16px', borderRadius: '5px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'escola' ? '#fff' : '#0277bd', color: activeTab === 'escola' ? '#0288d1' : '#fff', fontWeight: 'bold' }}
          >
            <BarChart3 size={16} /> Painel Pedagógico
          </button>
        </div>
      </header>

      {/* Visão do Aluno */}
      {activeTab === 'aluno' && (
        <main style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', maxWidth: '600px', margin: '0 auto', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3>Como você está se sentindo hoje?</h3>
          
          <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#e1f5fe', borderRadius: '6px' }}>
            <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Simular dia da votação:</label>
            <select 
              value={diaAtual} 
              onChange={(e) => setDiaAtual(e.target.value)}
              style={{ padding: '5px 10px', borderRadius: '4px', border: '1px solid #0288d1' }}
            >
              <option value="Seg">Segunda-feira</option>
              <option value="Ter">Terça-feira</option>
              <option value="Qua">Quarta-feira</option>
              <option value="Qui">Quinta-feira</option>
              <option value="Sex">Sexta-feira</option>
            </select>
          </div>

          <p style={{ color: '#666' }}>Selecione a carinha que melhor representa o seu dia:</p>
          
          <div style={{ display: 'flex', justifyContent: 'space-around', margin: '30px 0' }}>
            <button onClick={() => registrarEmocao('bem')} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
              <Smile size={64} color="#4caf50" />
              <p style={{ fontWeight: 'bold', color: '#4caf50' }}>Muito Bem</p>
            </button>
            <button onClick={() => registrarEmocao('normal')} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
              <Meh size={64} color="#ff9800" />
              <p style={{ fontWeight: 'bold', color: '#ff9800' }}>Normal</p>
            </button>
            <button onClick={() => registrarEmocao('ruim')} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
              <Frown size={64} color="#f44336" />
              <p style={{ fontWeight: 'bold', color: '#f44336' }}>Chateado(a)</p>
            </button>
          </div>

          {mensagemSucesso && (
            <div style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '12px', borderRadius: '5px', fontWeight: 'bold' }}>
              {mensagemSucesso}
            </div>
          )}
        </main>
      )}

      {/* Visão do Psicólogo/Pedagogo */}
      {activeTab === 'escola' && (
        <main style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3>Acompanhamento Emocional da Turma (Tempo Real)</h3>
              <p style={{ color: '#666' }}>Contagem exata dos registros efetuados pelos alunos.</p>
            </div>
            <button 
              onClick={resetarDados} 
              style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <RotateCcw size={16} /> Zerar Dados
            </button>
          </div>

          {/* Gráfico */}
          <div style={{ width: '100%', height: 300, marginTop: '20px' }}>
            <ResponsiveContainer>
              <LineChart data={dadosFormatados}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="felicidade" stroke="#4caf50" strokeWidth={3} name="Muito Bem" />
                <Line type="monotone" dataKey="normal" stroke="#ff9800" strokeWidth={3} name="Normal" />
                <Line type="monotone" dataKey="ansiedade" stroke="#f44336" strokeWidth={3} name="Chateado(a)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Tabela de Dados Simplificada */}
          <div style={{ marginTop: '30px' }}>
            <h4 style={{ marginBottom: '10px' }}>Resumo dos Registros em Tabela:</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#0288d1', color: '#fff' }}>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>Dia</th>
                  <th style={{ padding: '8px', border: '1px solid #ddd', color: '#a5d6a7' }}>Muito Bem (Verde)</th>
                  <th style={{ padding: '8px', border: '1px solid #ddd', color: '#ffe082' }}>Normal (Amarelo)</th>
                  <th style={{ padding: '8px', border: '1px solid #ddd', color: '#ef9a9a' }}>Chateado (Vermelho)</th>
                  <th style={{ padding: '8px', border: '1px solid #ddd' }}>Total de Votos</th>
                </tr>
              </thead>
              <tbody>
                {dadosFormatados.map((item) => (
                  <tr key={item.data} style={{ backgroundColor: '#fff' }}>
                    <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>{item.data}-feira</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd', color: '#2e7d32', fontWeight: 'bold' }}>{item.felicidade}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd', color: '#e65100', fontWeight: 'bold' }}>{item.normal}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd', color: '#c62828', fontWeight: 'bold' }}>{item.ansiedade}</td>
                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.votos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}
    </div>
  );
}