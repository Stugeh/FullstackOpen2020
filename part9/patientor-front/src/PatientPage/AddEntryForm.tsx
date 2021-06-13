// TODO remove unused variables
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {Field, Formik, Form} from 'formik';
import {useStateValue} from '../state';
import { Patient } from '../types';
import {DiagnosisSelection} from '../AddPatientModal/FormField';
const AddEntryForm = ({patient}:{patient:Patient}) => {
    const [{ diagnoses }] = useStateValue();
    
    const onSubmit = () => {
        console.log(`submit`);
    };

    return (
        <Formik
            initialValues={{}}
            onSubmit={onSubmit}
            validate={values => {console.log('values :>> ', values);}}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />  
                </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;