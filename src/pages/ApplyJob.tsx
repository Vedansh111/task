import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Check } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useState } from "react";

const ApplyJob = () => {
  const { id } = useParams();
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const [selectedResumeFile, setSelectedResumeFile] = useState(null);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const initialValues = {
    email: user || "",
    phone: "",
    coverLetter: "",
    resume: null,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits") 
      .required("Phone number is required"),
    coverLetter: Yup.string().required("Cover letter is required"),
    resume: Yup.mixed().required("Resume is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const applicationData = {
      id,
      ...values,
    };
    localStorage.setItem("jobApplication", JSON.stringify(applicationData));

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Application Submitted!",
      showConfirmButton: false,
      timer: 1500,
    });

    setSubmitting(false);

    navigate("/jobs");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <Link
              to={`/jobs/${id}`}
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Job Details
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Apply for Position
            </h1>
            <p className="mt-2 text-gray-600">
              Fill out the form below to submit your application.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting, errors, touched }) => (
              <Form className="p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address *
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-sm text-red-500 mt-1"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number *
                      </label>
                      <Field
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-sm text-red-500 mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="resume"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Resume *
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400">
                    <div className="space-y-1 text-center">
                      {selectedResumeFile ? (
                        <Check className="mx-auto h-12 w-12 text-green-500" />
                      ) : (
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      )}

                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="resume"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="resume"
                            name="resume"
                            type="file"
                            accept=".pdf"
                            required
                            onChange={(e) => {
                              const file = e?.currentTarget?.files?.[0];
                              setFieldValue("resume", file);
                              setSelectedResumeFile(file);
                            }}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      {selectedResumeFile && (
                        <p className="text-sm text-gray-800 mt-2">
                          Selected:{" "}
                          <span className="font-semibold">
                            {selectedResumeFile.name}
                          </span>
                        </p>
                      )}
                      <p className="text-xs text-gray-500">PDF only</p>
                      <ErrorMessage
                        name="resume"
                        component="div"
                        className="text-sm text-red-500 mt-1"
                      />
                      {errors.resume &&
                        touched.resume &&
                        !selectedResumeFile && (
                          <div className="text-sm text-red-500 mt-1">
                            Resume is required
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="coverLetter"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Cover Letter *
                  </label>
                  <Field
                    as="textarea"
                    id="coverLetter"
                    name="coverLetter"
                    rows={6}
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="coverLetter"
                    component="div"
                    className="text-sm text-red-500 mt-1"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Link
                    to={`/jobs/${id}`}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
