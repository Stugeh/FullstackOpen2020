import React from 'react';
import {View, Pressable} from 'react-native';
import {useHistory} from 'react-router-native';
import Formik from 'formik';
import * as yup from 'yup';
import {useMutation} from '@apollo/client';

import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import Text from './Text';

import { POST_REVIEW } from '../graphql/mutations';

const styles = {
  container: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    margin: 30,
    elevation: 50,
  },
  form:{
    width:200,
    padding: 10,
  },
};



const ReviewFormContainer = ({onSubmit}) => {
  const validationSchema = yup.object().shape({
    repositoryName: yup.string().required('username is required'),
    ownerName: yup.string().required('password is required'),
    rating: yup
      .number()
      .required()
      .positive()
      .integer()
      .max(100)
      .required('rating is required'),
    review: yup.string()
  });
    
  const initialValues = {
    repositoryName: '',
    ownerName: '',
    rating: '',
    review: '', 
  };
    
  return (
    <View style={styles.container}>
      <Formik  
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <View style={styles.form}>
            <FormikTextInput
              testID='repoOwnerInput'
              style={styles.field}
              placeholder='Repository owner name *'
              name='ownerName'
            />
            <FormikTextInput
              testID='repoNameInput'
              style={styles.field}
              placeholder='repository name *'
              name='repositoryName'
            />
            <FormikTextInput
              testID='ratingInput'
              style={styles.field}
              placeholder='0-100 *'
              name='rating'
            />
            <FormikTextInput
              testID='reviewInput'
              style={styles.field}
              placeholder='Review'
              name='review'
            />
            <Pressable testID='reviewSubmit' onPress={handleSubmit}>
              <View style={theme.button}>
                <Text style={theme.buttonText}>Log in</Text>
              </View>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

const ReviewForm = () => {
  const history = useHistory();
  const [postReview, {data, loading, error}] = useMutation(POST_REVIEW);
  const onSubmit = async (values) => {
    const { repositoryName,ownerName,rating,review } = values;
    await postReview({repositoryName,ownerName,rating, review});
    console.log(data);
  };
  return (
    <ReviewFormContainer onSubmit={onSubmit}/>
  );
};

export default ReviewForm;