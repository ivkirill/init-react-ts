import React, { PureComponent, ReactNode, ComponentType } from 'react';
import cn from 'classnames';

import { ModelId } from '@interfaces';

import s from './Table.scss';

export interface TableHead {
  name: string;
  value?: ReactNode;
}

export interface RowProps {
  id: ModelId;
  cols: string[];
  className?: string;
}

export interface TableProps {
  data: ModelId[];
  headers: TableHead[];
  cols: string[];
  className?: string;
  classNameRow?: string;
  componentRow: ComponentType<RowProps>;
}

class Table extends PureComponent<TableProps> {
  renderHeadCell = (cell: TableHead, i: number) => {
    const { name, value } = cell;
    const key = `head-${i}`;

    return <span key={key} data-name={name} className={s.head}>{value}</span>;
  }

  renderHead() {
    const { headers = [], classNameRow } = this.props;
    const className = cn(s.header, classNameRow);

    return (
      <div className={className}>
        {headers.map(this.renderHeadCell)}
      </div>
    );
  }

  renderRows() {
    const { data, cols, componentRow: ComponentRow, classNameRow } = this.props;
    const className = cn(s.row, classNameRow);

    return data.map((id, i) => {
      const key = `table-row-${i}`;

      return (<ComponentRow id={id} cols={cols} className={className} key={key} />);
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
