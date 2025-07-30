import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiDesktopComputer, HiDownload, HiCheckCircle } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext';

const SetupWizard = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const { isDarkMode } = useTheme();

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
    markAsComplete(currentStep);
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const markAsComplete = (stepIndex) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const renderStepContent = (step) => {
    return (
      <div>
        <p className={`mb-4 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>{step.description}</p>
        {step.link && (
          <a
            href={step.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            <HiDownload className="mr-2" />
            {step.linkText || 'Download'}
          </a>
        )}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-6 p-6 rounded-lg shadow-lg ${
        isDarkMode 
          ? 'bg-gray-800 bg-opacity-50 border border-gray-700' 
          : 'bg-white bg-opacity-80 border border-gray-200'
      }`}
    >
      <h4 className="text-lg font-bold text-purple-400 mb-4 flex items-center">
        <HiDesktopComputer className="mr-2" />
        Lab Setup Wizard
      </h4>

      {/* Stepper */}
      <div className="flex justify-between items-center mb-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                index === currentStep
                  ? 'bg-purple-600 text-white'
                  : completedSteps.includes(index)
                    ? 'bg-green-500 text-white'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-400'
                      : 'bg-gray-200 text-gray-600'
              }`}
            >
              {completedSteps.includes(index) ? <HiCheckCircle /> : index + 1}
            </div>
            <span className={`ml-2 text-sm font-medium ${
              index === currentStep ? (isDarkMode ? 'text-white' : 'text-gray-900') : (isDarkMode ? 'text-gray-400' : 'text-gray-500')
            }`}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${
                completedSteps.includes(index) ? 'bg-green-500' : 'bg-gray-500'
              }`}></div>
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="p-4 rounded-lg bg-gray-900/50 min-h-[150px]">
        <h5 className="font-bold mb-2">{steps[currentStep].title}</h5>
        {renderStepContent(steps[currentStep])}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {currentStep === steps.length - 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-green-900/50 rounded-lg text-center"
        >
          <p className="font-semibold text-green-300">🎉 All steps completed! You are ready to start practicing.</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SetupWizard;

