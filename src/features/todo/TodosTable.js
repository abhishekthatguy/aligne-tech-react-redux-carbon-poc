import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos,addTodo, deleteTodo,setTodos } from "./todosSlice";
import { Button, DataTable,Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
    TableCell
} from '@carbon/react';
import { Add, TrashCan } from '@carbon/react/icons';
import styles from './Todos.module.scss';

const columns = [
  {
    header: "Title",
    key: "title",
    },
  {
    header: "Status",
      key: "completed",
    },
  {
    header: "Actions",
      key: "actions",
    
  },
];
export function TodosTable (){
  const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.todos);
    const handleAddTodo = () => {
    dispatch(addTodo({ title: "New Todo", completed: false }));
  };

    const handleDeleteTodo = id => {
    dispatch(deleteTodo(id));
    };
        const handleStatusTodo = id => {
    dispatch(setTodos(id));
  };
useEffect(() => {
dispatch(fetchTodos());
}, [dispatch]);

if (loading) {
return <div>Loading...</div>;
}

if (error) {
return <div>Error: {error.message}</div>;
}
    return (
        <><div className={styles.toolbar}>
            <Button onClick={handleAddTodo} className="button" size="md" renderIcon={Add} iconDescription="Add">Add Todo List</Button>
            
        </div><DataTable rows={items || []} headers={columns}>
                {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
                    <Table {...getTableProps()}>
                        <TableHead>
                            <TableRow>
                                {headers.map((header) => (
                                    <TableHeader {...getHeaderProps({ header })}>
                                        {header.header}
                                    </TableHeader>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow {...getRowProps({ row })}>
                                    {row.cells.map((cell, index) => {
                                        if (index === row.cells.length - 2) {
                                            return (<TableCell key={cell.id}>{row.completed ? 'Completed' : 'Not Completed'}</TableCell>);
                                        } else if (index === row.cells.length - 1) {
                                            return (
                                                <TableCell key={cell.id}>
                                                    <Button hasIconOnly onClick={() => handleDeleteTodo(row.id)} size="sm" renderIcon={TrashCan} kind="danger" iconDescription="Delete this row" tooltipAlignment="start"/>
                                                </TableCell>
                                            );
                                        } else {
                                            return (<TableCell key={cell.id}>{cell.value}</TableCell>);
                                        }
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </DataTable></>
           
        
  );
        
};
