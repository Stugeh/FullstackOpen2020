// TODO remove unused variables
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import {Button} from 'semantic-ui-react';

import {Field, Formik, Form} from 'formik';
import {useStateValue} from '../state';
import { HealthCheckRating, NewHealthCheckEntry, Patient } from '../types';
import {DiagnosisSelection, NumberField, TextField} from '../AddPatientModal/FormField';

interface Props {
    onSubmit: (values: NewHealthCheckEntry) => void;
    onCancel: () => void;
  }

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses },] = useStateValue();
    return (
        <Formik
            initialValues={{
                description: '',
                date: '',
                specialist: '',
                diagnosisCodes: [],
                healthCheckRating: HealthCheckRating.Healthy,
                type: 'HealthCheck'
            }}
            onSubmit={onSubmit}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field label="description" name="description" component={TextField}/>
                        <Field label="date" name="date" component={TextField} />
                        <Field label="specialist" name="specialist" component={TextField} />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />  
                        <Field
                            label="healthCheckRating"
                            name="healthCheckRating"
                            component={NumberField}
                            min={0}
                            max={3}
                        />
                        <Button
                          type="submit"
                          floated="right"
                          color="green"
                          disabled={!dirty || !isValid}
                        >
                          Add
                        </Button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;