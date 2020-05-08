import React, { ReactNode, PureComponent } from 'react';
import cn from 'classnames';

import { ModelId, TableHead, TableProps } from '@interfaces';

import s from './Table.scss';

class Table<T extends string> extends PureComponent<TableProps<T>> {
  renderHeadCell = (cell: TableHead, i: number) => {
    const { name, value } = cell;
    const key = `head-${i}`;

    return <span key={key} data-name={name} className={s.head}>{value}</span>;
  }

  renderHead() {
    const { getHeader, cols, classNameRow } = this.props;
    const className = cn(s.header, classNameRow);

    const headers: TableHead[] = cols.map(getHeader);

    return (
      <div className={className}>
        {headers.map(this.renderHeadCell)}
      </div>
    );
  }

  renderRow(data: Record<T, ReactNode>, rowKey: string, rowClassName: string): ReactNode {
    const { cols } = this.props;

    return (
        <div className={rowClassName} key={rowKey}>
            {cols.map((name: T, i: number) => {
                const cellKey = `row-cell-${i}`;

                return (
                    <span data-name={name} key={cellKey}>
                        {data[name]}
                    </span>
                );
            })}
        </div>
    );
  };

  renderRows() {
    const { ids, getRowData, classNameRow } = this.props;
    const rowClassName = cn(s.row, classNameRow);

    return ids.map((id: ModelId, i: number) => {
        const rowKey = `table-row-${i}-${id}`;
        const data = getRowData({ id });

        return this.renderRow(data, rowKey, rowClassName);
    });
  }

  render() {
    const { className } = this.props;
    const rootClassName = cn(s.root, className);

    return (
      <div className={rootClassName}>
        {this.renderHead()}

        {this.renderRows()}
      </div>
    );
  }
}


export default Table;
