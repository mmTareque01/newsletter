import { IconButtonProps } from '@/types/buttons';
import React from 'react';
import { MdBlock, MdOutlineBookmarkRemove, MdOutlineDelete } from 'react-icons/md';



export const DeleteIcon: React.FC<IconButtonProps> = ({
    onClick,
    color = '#FF6363',
    cursor = 'pointer',
    size = 20,
    className = '',
    style = {},
}) => {
    return (
        <MdOutlineDelete
            color={color}
            cursor={cursor}
            size={size}
            title='Delete'
            className={className}
            style={style}
            onClick={(e) => {
                e.stopPropagation();
                onClick?.(e);
            }}
        />
    );
};

export const BlockIcon: React.FC<IconButtonProps> = ({
    onClick,
    color = '#FE5D26',
    cursor = 'pointer',
    size = 20,
    className = '',
    style = {},
}) => {
    return (
        <MdBlock
            color={color}
            cursor={cursor}
            size={size}
            className={className}
            style={style}
            title='Block'
            onClick={(e) => {
                e.stopPropagation();
                onClick?.(e);
            }}
        />
    );
};

export const UnsubscribeIcon: React.FC<IconButtonProps> = ({
    onClick,
    color = '#FF9149',
    cursor = 'pointer',
    size = 20,
    className = '',
    style = {},
}) => {
    return (
        <MdOutlineBookmarkRemove
            color={color}
            cursor={cursor}
            size={size}
            title='Unsubscribe'
            className={className}
            style={style}
            onClick={(e) => {
                e.stopPropagation();
                onClick?.(e);
            }}
        />
    );
};

// export default DeleteIcon;