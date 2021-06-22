// TODO remove unused variables
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';

import {Button, Grid} from 'semantic-ui-react';

import { Field, Formik, Form } from 'formik';
import {Form as SemanticForm} from 'semantic-ui-react';
import {useStateValue} from '../state';
import { HealthCheckRating, NewHealthCheckEntry, Patient } from '../types';
import {SelectField, NumberField} from '../AddPatientModal/FormField';
import BaseFields from './BaseFields';
import AdditionalFields from './AdditionalFields';

interface Props {
    onSubmit: (values: NewHealthCheckEntry) => void;
    onCancel: () => void;
  }

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [formType, setFormType] = useState('');
    const entryOptions = [
        {label: 'Check up', value:'HealthCheck'},
        {label: 'Occupational', value:'OccupationalHealthcare'},
        {label: 'Hospital', value:'Hospital'}
    ];
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
                        <SemanticForm.Field>
                            <label>Entry Type</label>
                            <Field
                                as='select'
                                name='entryTypeSelection'
                                className='ui dropdown'
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setFormType(e.target.value )
                                }
                            >
                                {entryOptions.map(option => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label || option.value}
                                    </option>
                                ))}
                            </Field>
                        </SemanticForm.Field>
                        <BaseFields
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                        />
                        <AdditionalFields formType={formType}/>
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