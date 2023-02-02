import React from 'react';
import { TodosTable } from './features/todo/TodosTable';
import { Section, Heading } from '@carbon/react';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Section as="data-table">
        <Heading>Aligne Tech POC</Heading>
      </Section>
      <TodosTable />
    </div>
  );
}

export default App;
