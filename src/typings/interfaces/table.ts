import { ReactNode } from 'react';
import { ModelId } from '@interfaces';

export interface GetRowDataProps {
    id: ModelId;
}

export interface TableHead {
    name: string;
    value?: ReactNode;
}

export interface TableProps<T extends string> {
    ids: ModelId[];
    cols: readonly T[];
    getHeader: (props?: any) => TableHead;
    getRowData: (props: GetRowDataProps) => Record<T, ReactNode>;
    className?: string;
    classNameRow?: string;
}
