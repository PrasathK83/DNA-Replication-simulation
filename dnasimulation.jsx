import React, { useState } from 'react';
import { AlertCircle, CheckCircle, RotateCcw } from 'lucide-react';

const DNARepairSimulation = () => {
  const [start, setStart] = useState(false);
  const [originalDNA, setOriginalDNA] = useState('ATCGTAGCTA');
  const [mutatedIndex, setMutatedIndex] = useState(null);
  const [mutatedBase, setMutatedBase] = useState(null);
  const [selectedBase, setSelectedBase] = useState(null);
  const [repaired, setRepaired] = useState(false);
  const [showComplement, setShowComplement] = useState(false);

  const bases = ['A', 'T', 'C', 'G'];
  const complementMap = { 'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C' };

  const baseColors = {
    'A': '#FF6B6B',
    'T': '#4ECDC4',
    'C': '#FFE66D',
    'G': '#95E1D3'
  };

  const getComplement = (sequence) => {
    return sequence.split('').map(base => complementMap[base] || '?').join('');
  };

  const introduceMutation = (index) => {
    const originalBase = originalDNA[index];
    const possibleMutations = bases.filter(b => b !== originalBase);
    const mutation = possibleMutations[Math.floor(Math.random() * possibleMutations.length)];
   
    setMutatedIndex(index);
    setMutatedBase(mutation);
    setSelectedBase(null);
    setRepaired(false);
    setShowComplement(false);
  };

  const getCurrentDNA = () => {
    if (mutatedIndex === null) return originalDNA;
    return originalDNA.substring(0, mutatedIndex) + mutatedBase + originalDNA.substring(mutatedIndex + 1);
  };

  const handleBaseSelection = (base) => {
    setSelectedBase(base);
    if (base === originalDNA[mutatedIndex]) {
      setRepaired(true);
      setTimeout(() => {
        setMutatedIndex(null);
        setMutatedBase(null);
        setSelectedBase(null);
      }, 2000);
    }
  };

  const reset = () => {
    setMutatedIndex(null);
    setMutatedBase(null);
    setSelectedBase(null);
    setRepaired(false);
    setShowComplement(false);
  };

  const currentDNA = getCurrentDNA();
  const complementDNA = getComplement(currentDNA);

  // Welcome Screen
  if (!start) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-800 via-indigo-900 to-black p-6">
        <div className="max-w-2xl bg-black bg-opacity-40 p-10 rounded-2xl shadow-2xl backdrop-blur text-center border border-purple-600">
          <h1 className="text-4xl font-bold text-purple-300 mb-4">
            Welcome to the DNA Repair Simulation
          </h1>
          <p className="text-purple-200 leading-relaxed mb-8 text-lg">
            This interactive tool allows you to explore how DNA mutations occur
            and how the cell repairs them using complementary base pairing.
            Introduce a mutation, reveal the complementary strand, and try to
            repair it using your knowledge of DNA structure.
          </p>
          <button
            onClick={() => setStart(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg px-8 py-3 rounded-xl shadow-lg transition-all"
          >
            Start Simulation
          </button>
        </div>
      </div>
    );
  }

  // Main Simulation
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-white">
          DNA Mutation Repair Simulation
        </h1>
        <p className="text-center text-purple-200 mb-8">
          Click on a base pair to introduce a mutation, then repair it using the complementary strand
        </p>

        {/* DNA Double Helix Structure */}
        <div className="bg-gray-900 bg-opacity-50 rounded-lg shadow-2xl p-8 mb-6 backdrop-blur">
          <div className="relative">
            {/* Strand Labels */}
            <div className="flex justify-between mb-4 text-white font-semibold">
              <div className="text-pink-400">5' → 3' Strand</div>
              <div className="text-cyan-400">3' ← 5' Complementary Strand</div>
            </div>

            {/* DNA Base Pairs */}
            <div className="space-y-6">
              {currentDNA.split('').map((base, idx) => {
                const complement = complementDNA[idx];
                const isMutated = idx === mutatedIndex;
                const topColor = isMutated ? '#EF4444' : baseColors[base];
                const bottomColor = baseColors[complement];
               
                return (
                  <div key={idx} className="relative">
                    {/* Position Label */}
                    <div className="absolute -left-12 top-8 text-gray-400 text-sm">
                      {idx + 1}
                    </div>

                    {/* Top Strand (Original) */}
                    <div className="flex items-center gap-4">
                      {/* Left Backbone */}
                      <div className="w-3 h-20 bg-gradient-to-b from-pink-600 to-pink-400 rounded-full shadow-lg"></div>
                     
                      {/* Top Base */}
                      <div
                        onClick={() => mutatedIndex === null && introduceMutation(idx)}
                        className={`relative flex items-center justify-center cursor-pointer transition-all duration-300 ${mutatedIndex === null ? 'hover:scale-110' : ''}`}
                      >
                        <div
                          className={`w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-2xl ${isMutated ? 'animate-pulse ring-4 ring-red-500' : ''}`}
                          style={{ backgroundColor: topColor }}
                        >
                          {base}
                        </div>
                      </div>

                      {/* Hydrogen Bonds */}
                      <div className="flex-1 relative">
                        <svg width="100%" height="60" className="absolute top-1/2 -translate-y-1/2">
                          {/* Dashed lines representing hydrogen bonds */}
                          <line
                            x1="0"
                            y1="30"
                            x2="100%"
                            y2="30"
                            stroke={isMutated ? "#EF4444" : "#6366F1"}
                            strokeWidth="3"
                            strokeDasharray="8,8"
                            className={isMutated ? 'animate-pulse' : ''}
                          />
                          {(base === 'A' || base === 'T') && (
                            <>
                              <line x1="0" y1="20" x2="100%" y2="20" stroke={isMutated ? "#EF4444" : "#6366F1"} strokeWidth="2" strokeDasharray="8,8" opacity="0.5" />
                            </>
                          )}
                          {(base === 'C' || base === 'G') && (
                            <>
                              <line x1="0" y1="15" x2="100%" y2="15" stroke={isMutated ? "#EF4444" : "#6366F1"} strokeWidth="2" strokeDasharray="8,8" opacity="0.5" />
                              <line x1="0" y1="45" x2="100%" y2="45" stroke={isMutated ? "#EF4444" : "#6366F1"} strokeWidth="2" strokeDasharray="8,8" opacity="0.5" />
                            </>
                          )}
                        </svg>
                      </div>

                      {/* Bottom Base (Complement) */}
                      <div className={`transition-all duration-500 ${showComplement && isMutated ? 'opacity-100 scale-100 ring-4 ring-green-400' : showComplement ? 'opacity-100 scale-100' : 'opacity-30 scale-90'}`}>
                        <div
                          className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-white font-bold text-2xl"
                          style={{ backgroundColor: bottomColor }}
                        >
                          {complement}
                        </div>
                      </div>

                      {/* Right Backbone */}
                      <div className="w-3 h-20 bg-gradient-to-b from-cyan-600 to-cyan-400 rounded-full shadow-lg"></div>
                    </div>

                    {/* Mutation Indicator */}
                    {isMutated && (
                      <div className="absolute -right-16 top-8 text-red-400 animate-bounce">
                        <AlertCircle size={32} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Controls and Status */}
        {mutatedIndex !== null && (
          <div className="bg-gray-900 bg-opacity-50 rounded-lg shadow-lg p-6 mb-6 backdrop-blur">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="text-red-400" />
              <h2 className="text-xl font-semibold text-red-400">
                Mutation Detected at Position {mutatedIndex + 1}
              </h2>
            </div>
            <div className="bg-red-900 bg-opacity-30 border-2 border-red-500 rounded-lg p-4 mb-4">
              <p className="text-white">
                Original base: <span className="font-bold text-green-400">{originalDNA[mutatedIndex]}</span> →
                Mutated to: <span className="font-bold text-red-400">{mutatedBase}</span>
              </p>
            </div>
           
            {!showComplement && (
              <button
                onClick={() => setShowComplement(true)}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                Reveal Complementary Strand
              </button>
            )}
          </div>
        )}

        {/* Repair Section */}
        {showComplement && mutatedIndex !== null && !repaired && (
          <div className="bg-gray-900 bg-opacity-50 rounded-lg shadow-lg p-6 mb-6 backdrop-blur">
            <h2 className="text-xl font-semibold mb-4 text-white">Select the Correct Base to Repair</h2>
            <p className="text-purple-200 mb-4">
              Based on the complementary strand showing <span className="font-bold text-green-400 text-xl">{complementDNA[mutatedIndex]}</span>,
              which base should replace the mutation?
            </p>
            <div className="flex gap-6 justify-center">
              {bases.map(base => (
                <button
                  key={base}
                  onClick={() => handleBaseSelection(base)}
                  className={`w-20 h-20 text-2xl font-bold rounded-full transition-all shadow-lg
                    ${selectedBase === base
                      ? base === originalDNA[mutatedIndex]
                        ? 'ring-4 ring-green-400 scale-110'
                        : 'ring-4 ring-red-400 scale-95'
                      : 'hover:scale-110'
                    }
                  `}
                  style={{
                    backgroundColor: baseColors[base],
                    color: 'white'
                  }}
                >
                  {base}
                </button>
              ))}
            </div>
            {selectedBase && selectedBase !== originalDNA[mutatedIndex] && (
              <p className="text-center text-red-400 mt-4 font-semibold">
                Incorrect! Try again.
              </p>
            )}
          </div>
        )}

        {/* Success Message */}
        {repaired && (
          <div className="bg-green-900 bg-opacity-30 border-2 border-green-400 rounded-lg p-6 mb-6 flex items-center gap-3 backdrop-blur">
            <CheckCircle className="text-green-400" size={32} />
            <div>
              <h3 className="text-xl font-bold text-green-400">Repair Successful!</h3>
              <p className="text-green-200">The DNA has been restored to its original sequence.</p>
            </div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex justify-center gap-4">
          {mutatedIndex !== null && (
            <button
              onClick={reset}
              className="flex items-center gap-2 bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
            >
              <RotateCcw size={20} />
              Reset Simulation
            </button>
          )}
        </div>

        {/* Instructions */}
        {mutatedIndex === null && (
          <div className="bg-gray-900 bg-opacity-50 border-2 border-purple-500 rounded-lg p-6 backdrop-blur">
            <h3 className="font-semibold text-purple-400 mb-3 text-lg">How to use:</h3>
            <ol className="list-decimal list-inside space-y-2 text-purple-200">
              <li>Click on any base (colored circle) in the top strand to introduce a mutation</li>
              <li>Click "Reveal Complementary Strand" to see the bottom strand clearly</li>
              <li>Use the complementary base to identify the correct original base</li>
              <li>Select the correct base from the options to repair the mutation</li>
            </ol>
            <div className="mt-4 pt-4 border-t border-purple-700">
              <p className="text-purple-300 text-sm">
                <strong>Base Pairing Rules:</strong> A ↔ T (2 bonds), C ↔ G (3 bonds)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DNARepairSimulation;