import { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../providers/AuthProvider';

const petCategories = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'bird', label: 'Bird' },
    { value: 'other', label: 'Other' },
];

const AddPet = () => {
    const [imageURL, setImageURL] = useState('');
    const [uploading, setUploading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'pet_images');

        setUploading(true);
        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/drfwpb4lu/image/upload', formData);
            setImageURL(response.data.secure_url);
        } catch (error) {
            console.error('Error uploading image', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg font-sourceSans3">
            <h1 className="text-2xl font-bold mb-6 text-center">Add a Pet</h1>
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
                        userEmail: user?.email
                    };

                    try {
                        const res = await axiosSecure.post('/pets', petData);
                        const data = res.data;
                        // console.log(data);
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
                            title: "Error",
                            text: "Your pet was not added",
                            icon: "error"
                        });
                    }

                    setSubmitting(false);
                }}
            >
                {({ setFieldValue, isSubmitting }) => (
                    <Form className="space-y-6">
                        <div className="flex flex-col">
                            <label htmlFor="petImage" className="mb-2 text-sm font-medium text-gray-700">Pet Image</label>
                            <input
                                type="file"
                                id="petImage"
                                onChange={(event) => handleImageUpload(event.currentTarget.files[0])}
                                className="border border-gray-300 rounded p-2"
                            />
                            {uploading && <p className="text-sm text-blue-500">Uploading image...</p>}
                            {imageURL && <img src={imageURL} alt="Pet" className="mt-4 rounded" width="100" />}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="petName" className="mb-2 text-sm font-medium text-gray-700">Pet Name</label>
                            <Field name="petName" type="text" className="border border-gray-300 rounded p-2" />
                            <ErrorMessage name="petName" component="div" className="text-sm text-red-500" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="petAge" className="mb-2 text-sm font-medium text-gray-700">Pet Age</label>
                            <Field name="petAge" type="number" className="border border-gray-300 rounded p-2" />
                            <ErrorMessage name="petAge" component="div" className="text-sm text-red-500" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="petCategory" className="mb-2 text-sm font-medium text-gray-700">Pet Category</label>
                            <Field name="petCategory">
                                {({ field }) => (
                                    <Select
                                        {...field}
                                        options={petCategories}
                                        onChange={(option) => setFieldValue('petCategory', option.value)}
                                        className="border border-gray-300 rounded p-2"
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="petCategory" component="div" className="text-sm text-red-500" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="petLocation" className="mb-2 text-sm font-medium text-gray-700">Pet Location</label>
                            <Field name="petLocation" type="text" className="border border-gray-300 rounded p-2" />
                            <ErrorMessage name="petLocation" component="div" className="text-sm text-red-500" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="shortDescription" className="mb-2 text-sm font-medium text-gray-700">Short Description</label>
                            <Field name="shortDescription" type="text" className="border border-gray-300 rounded p-2" />
                            <ErrorMessage name="shortDescription" component="div" className="text-sm text-red-500" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="longDescription" className="mb-2 text-sm font-medium text-gray-700">Long Description</label>
                            <Field name="longDescription" as="textarea" className="border border-gray-300 rounded p-2 h-32" />
                            <ErrorMessage name="longDescription" component="div" className="text-sm text-red-500" />
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
                            >
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddPet;