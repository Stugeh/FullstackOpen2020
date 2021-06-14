import React from 'react';
import { Field } from 'formik';
import {TextField, DiagnosisSelection} from '../AddPatientModal/FormField';
import { useStateValue } from '../state';

type Props = {
    setFieldValue: (
        field: string,
        value: string,
        shouldValidate?: boolean | undefined
    ) => void,
    
    setFieldTouched: (
        field: string,
        isTouched?: boolean | undefined,
        shouldValidate?: boolean | undefined
    ) => void
};

const BaseFields = ({ setFieldValue, setFieldTouched }: Props) => {
    const [{ diagnoses },] = useStateValue();
    return (
        <div>
            <Field
                label="description"
                name="description"
                component={TextField}
                placeholder='description'
            />
            <Field
                label="date"
                name="date"
                component={TextField}
                placeholder="YYYY-MM-DD"
            />
            <Field
                label="specialist"
                name="specialist"
                component={TextField}
                placeholder="specialist"
            />
            <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
            />  
        </div>
    );
};

export default BaseFields;