import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const petCategories = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'bird', label: 'Bird' },
    { value: 'other', label: 'Other' },
];

const AddPet = () => {
    const [imageURL, setImageURL] = useState('');
    const axiosSecure = useAxiosSecure();

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'pet_images');

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/drfwpb4lu/image/upload', formData);
            setImageURL(response.data.secure_url);
        } catch (error) {
            console.error('Error uploading image', error);
        }
    };

    return (
        <Formik
            initialValues={{
                petName: '',
                petAge: '',
                petCategory: '',
                petLocation: '',
                shortDescription: '',
                longDescription: '',
            }}
            validationSchema={Yup.object({
                petName: Yup.string().required('Pet name is required'),
                petAge: Yup.number().required('Pet age is required').positive('Age must be positive').integer('Age must be an integer'),
                petCategory: Yup.string().required('Pet category is required'),
                petLocation: Yup.string().required('Pet location is required'),
                shortDescription: Yup.string().required('Short description is required'),
                longDescription: Yup.string().required('Long description is required'),
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
                if (!imageURL) {
                    alert('Please upload an image for the pet.');
                    setSubmitting(false);
                    return;
                }

                const petData = {
                    ...values,
                    petImage: imageURL,
                    dateAdded: new Date().toISOString(),
                    adopted: false,
                };

                try {
                    const res = await axiosSecure.post('/pets', petData);
                    const data = res.data;
                    console.log(data);
                    if (data.insertedId) {
                        Swal.fire({
                            title: "Success",
                            text: "Your pet is successfully added",
                            icon: "success"
                        });
                        resetForm();
                        setImageURL('');
                    }
                } catch (error) {
                    console.error('Error adding pet', error);
                    Swal.fire({
                        title: "Success",
                        text: "Your pet is not added",
                        icon: "success"
                    });
                }

                setSubmitting(false);
            }}
        >
            {({ setFieldValue, isSubmitting }) => (
                <Form>
                    <div>
                        <label htmlFor="petImage">Pet Image</label>
                        <input
                            type="file"
                            id="petImage"
                            onChange={(event) => handleImageUpload(event.currentTarget.files[0])}
                        />
                        {imageURL && <img src={imageURL} alt="Pet" width="100" />}
                    </div>
                    <div>
                        <label htmlFor="petName">Pet Name</label>
                        <Field name="petName" type="text" />
                        <ErrorMessage name="petName" component="div" />
                    </div>
                    <div>
                        <label htmlFor="petAge">Pet Age</label>
                        <Field name="petAge" type="number" />
                        <ErrorMessage name="petAge" component="div" />
                    </div>
                    <div>
                        <label htmlFor="petCategory">Pet Category</label>
                        <Field name="petCategory">
                            {({ field }) => (
                                <Select
                                    {...field}
                                    options={petCategories}
                                    onChange={(option) => setFieldValue('petCategory', option.value)}
                                />
                            )}
                        </Field>
                        <ErrorMessage name="petCategory" component="div" />
                    </div>
                    <div>
                        <label htmlFor="petLocation">Pet Location</label>
                        <Field name="petLocation" type="text" />
                        <ErrorMessage name="petLocation" component="div" />
                    </div>
                    <div>
                        <label htmlFor="shortDescription">Short Description</label>
                        <Field name="shortDescription" type="text" />
                        <ErrorMessage name="shortDescription" component="div" />
                    </div>
                    <div>
                        <label htmlFor="longDescription">Long Description</label>
                        <Field name="longDescription" as="textarea" />
                        <ErrorMessage name="longDescription" component="div" />
                    </div>
                    <div>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AddPet;