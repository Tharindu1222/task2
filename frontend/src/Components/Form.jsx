import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

function Form() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [fileNames, setFileNames] = useState([]);

  const onSubmit = async (data) => {
    setLoading(true);

    // Convert images to base64 strings or URLs
    const imagePromises = data.images ? Array.from(data.images).map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    }) : [];

    const images = await Promise.all(imagePromises);

    const formData = { ...data, images: images.join(',') };

    try {
      const response = await fetch('http://localhost:3000/ads', { // Update the URL to match your backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;

    // Ensure maximum of 3 files
    if (files.length > 3) {
      alert("You can upload a maximum of 3 images.");
      return;
    }

    // Store the file list using react-hook-form
    setValue('images', files);

    // Generate previews using the File API
    const previews = Array.from(files).map(file => URL.createObjectURL(file));
    setImagePreviews(previews);

    // Capture file names for display
    const names = Array.from(files).map(file => file.name);
    setFileNames(names);
  };

  useEffect(() => {
    return () => {
      // Clean up previews
      imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Build Your Listing</h2>
      <h3 className="text-2xl font-bold mb-6">Listing Item Details</h3>
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Row 1: First 4 Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Vehicle Make <span className="text-red-500">*</span></label>
            <input
              type="text"
              {...register('vehicleMake', { required: 'Vehicle make is required' })}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
            {errors.vehicleMake && <p className="text-red-500">{errors.vehicleMake.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Vehicle Model <span className="text-red-500">*</span></label>
            <input
              type="text"
              {...register('vehicleModel', { required: 'Vehicle model is required' })}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
            {errors.vehicleModel && <p className="text-red-500">{errors.vehicleModel.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Body Type <span className="text-red-500">*</span></label>
            <input
              type="text"
              {...register('bodyType', { required: 'Body type is required' })}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
            {errors.bodyType && <p className="text-red-500">{errors.bodyType.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Vehicle Registration Number <span className="text-red-500">*</span></label>
            <input
              type="text"
              {...register('vehicleRegistrationNumber', { required: 'Registration number is required' })}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
            {errors.vehicleRegistrationNumber && <p className="text-red-500">{errors.vehicleRegistrationNumber.message}</p>}
          </div>
        </div>

        {/* Row 2: Next 5 Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Millage <span className="text-red-500">*</span></label>
            <input
              type="number"
              {...register('millage', { required: 'Millage is required' })}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
            {errors.millage && <p className="text-red-500">{errors.millage.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Engine CC <span className="text-red-500">*</span></label>
            <input
              type="number"
              {...register('engineCC', { required: 'Engine CC is required' })}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
            {errors.engineCC && <p className="text-red-500">{errors.engineCC.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Fuel Type <span className="text-red-500">*</span></label>
            <select
              {...register('fuelType', { required: 'Fuel type is required' })}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            {errors.fuelType && <p className="text-red-500">{errors.fuelType.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Year of Manufactured <span className="text-red-500">*</span></label>
            <select
              {...register('yearOfManufactured', { required: 'Year of manufacture is required' })}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select</option>
              {Array.from({ length: 30 }, (_, i) => (
                <option key={i} value={2024 - i}>{2024 - i}</option>
              ))}
            </select>
            {errors.yearOfManufactured && <p className="text-red-500">{errors.yearOfManufactured.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">District <span className="text-red-500">*</span></label>
            <select
              {...register('district', { required: 'District is required' })}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select</option>
              <option value="District 1">District 1</option>
              <option value="District 2">District 2</option>
              <option value="District 3">District 3</option>
            </select>
            {errors.district && <p className="text-red-500">{errors.district.message}</p>}
          </div>
        </div>

        {/* Row 3: Last 4 Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Vehicle Grade</label>
            <input
              type="text"
              {...register('vehicleGrade')}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Exterior Color</label>
            <input
              type="text"
              {...register('exteriorColor')}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Interior Color</label>
            <input
              type="text"
              {...register('interiorColor')}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Number of Owners</label>
            <input
              type="number"
              {...register('numberOfOwners')}
              className="mt-1 block w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Upload Images <span className="text-red-500">*</span></label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
          />
          {errors.images && <p className="text-red-500">{errors.images.message}</p>}

          {/* Display selected file names */}
          {fileNames.length > 0 && (
            <ul className="mt-2">
              {fileNames.map((fileName, index) => (
                <li key={index} className="text-sm text-gray-600">{fileName}</li>
              ))}
            </ul>
          )}

          {/* Image previews */}
          <div className="flex mt-4 space-x-4">
            {imagePreviews.map((preview, index) => (
              <img key={index} src={preview} alt={`Preview ${index}`} className="h-24 w-24 object-cover rounded-md" />
            ))}
          </div>
        </div>

        {/* Asking Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Asking Price <span className="text-red-500">*</span></label>
          <input
            type="number"
            {...register('askingPrice', { required: 'Asking price is required' })}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
          />
          {errors.askingPrice && <p className="text-red-500">{errors.askingPrice.message}</p>}
        </div>

        {/* Submit button */}
        <div className="mb-4">
          <button
            type="submit"
            className={`w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
