import React from 'react';
import { Field } from 'formik';
import { TextField, NumberField } from '../AddPatientModal/FormField';
import {Header} from 'semantic-ui-react';

const AdditionalFields = ({formType}: {formType: string}) => {
    
    switch (formType) {
        case 'Hospital':
            return (
                <div></div>
            );
        case 'OccupationalHealthcare':
            return (
                <div>
                <Field
                    label="Employer"
                    name="employer"
                    component={TextField}
                    placeholder='Employer'
                />
                <Header as= 'h3'>SickLeave</Header>
                <Field
                    label='Start date'
                    name='startDate'
                    component={TextField}
                    placeholder='YYYY-MM-DD'
                />
                <Field
                    label='End date'
                    name='endDate'
                    component={TextField}
                    placeholder='YYYY-MM-DD'
                />
            </div>
            );
        case 'HealthCheck':
            return (
                <div>
                    <Field
                        label="healthCheckRating"
                        name="healthCheckRating"
                        component={NumberField}
                        min={0}
                        max={3}
                    />
                </div>
            );
        default:
            return <div></div>;
    }
};

export default AdditionalFields;