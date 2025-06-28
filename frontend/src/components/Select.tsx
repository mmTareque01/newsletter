// components/NewsletterSelect/SimpleNewsletterSelect.tsx
import React from 'react';
// import { NewsletterType, newsletterTypes } from '@/types/newsletter';

// types/newsletter.ts
export interface OptionType {
    id?: string;
    value?: string;
    label: string;
}

interface SelectProps {
    // selectedType: string;
    options: OptionType[];
    onSelect: (value: string) => void;
    label?: string;
    className?: string;
    required?: boolean;
}

const Select: React.FC<SelectProps> = ({
    // selectedType,
    options,
    onSelect,
    label = 'Select:',
    className = '',
    required = false
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelect(e.target.value);
    };

    return (
        <div className={`mb-4 text-black ${className}`}>

            <select
                id="newsletter-type"
                // value={selectedType}
                required={required}
                onChange={handleChange}
                className="w-full max-w-md p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="">-- {label} --</option>
                {options.map((type) => (
                    <option key={type.value} value={type.id || type.value || type.label}>
                        {type.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;