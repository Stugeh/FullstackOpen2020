import React from 'react';
import HealthCheckForm from './HealthCheckForm';
import HospitalForm from './HospitalForm';
import OccupationalHealthcareForm from './OccupationalForm';

const AdditionalFields = ({formType}: {formType: string}) => {
    
    switch (formType) {
        case 'Hospital':
            return <HospitalForm />;
        case 'OccupationalHealthcare':
            return <OccupationalHealthcareForm />;
        case 'HealthCheck':
            return <HealthCheckForm />;
        default:
            console.log(formType);
            return <div></div>;
    }
};

export default AdditionalFields;