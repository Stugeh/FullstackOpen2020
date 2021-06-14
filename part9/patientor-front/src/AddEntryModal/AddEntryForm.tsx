// TODO remove unused variables
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import {Button, Grid} from 'semantic-ui-react';

import {Field, Formik, Form} from 'formik';
import {useStateValue} from '../state';
import { HealthCheckRating, NewHealthCheckEntry, Patient } from '../types';
import {DiagnosisSelection, NumberField, TextField} from '../AddPatientModal/FormField';
import BaseFields from './BaseFields';

interface Props {
    onSubmit: (values: NewHealthCheckEntry) => void;
    onCancel: () => void;
  }

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
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
            validate={values => {
                const requiredError = "Field is required";
                const dateError = "Not a valid date";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (values.date.length !== 10 || !Date.parse(values.date))
                    errors.date = dateError;
                return errors;
              }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <BaseFields
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                        />
                        <Field
                            label="healthCheckRating"
                            name="healthCheckRating"
                            component={NumberField}
                            min={0}
                            max={3}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                              <Button type="button" onClick={onCancel} color="red">
                                Cancel
                              </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                              <Button
                                type="submit"
                                floated="right"
                                color="green"
                                disabled={!dirty || !isValid}
                              >
                                Add
                              </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;