import React from 'react';
import { Field } from 'formik';
import { TextField, NumberField } from '../AddPatientModal/FormField';
import {Header} from 'semantic-ui-react';

const AdditionalFields = ({formType}: {formType: string}) => {
    
    switch (formType) {
        case 'Hospital':
            return (
                <div>
                    <Field
                        label='Discharge date'
                        name='dischargeDate'
                        component={TextField}
                        placeholder='YYYY-MM-DD'
                    />
                    <Field
                        label='Discharge criteria'
                        name='dischargeCriteria'
                        component={TextField}
                    />
                </div>
            );
        case 'OccupationalHealthcare':
            return (
                <div>
                <Field
                    label="Employer"
                    name="employerName"
                    component={TextField}
                    placeholder='Employer'
                />
                <Header as= 'h3'>Sick Leave</Header>
                <Field
                    label='Start date'
                    name='sickLeaveStart'
                    component={TextField}
                    placeholder='YYYY-MM-DD'
                />
                <Field
                    label='End date'
                    name='sickLeaveEnd'
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