"use client";
import React, { useState } from "react";
import { ChevronRight, ChevronDown, Check } from "lucide-react";

// Types
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  selected: boolean;
  appointments: Appointment[];
}

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  type: string;
  status: "confirmed" | "pending" | "cancelled";
}

interface Category {
  id: string;
  name: string;
  expanded: boolean;
  children: SubCategory[];
}

interface SubCategory {
  id: string;
  name: string;
  expanded: boolean;
  doctors: Doctor[];
}

// Mock data
const initialCategories: Category[] = [
  {
    id: "clinical",
    name: "Clinical",
    expanded: false,
    children: [
      {
        id: "medicine",
        name: "Medicine",
        expanded: false,
        doctors: [
          {
            id: "doc1",
            name: "Dr. Sarah Johnson",
            specialty: "Cardiology",
            selected: false,
            appointments: [
              {
                id: "a1",
                patientName: "John Doe",
                time: "9:00 AM",
                type: "Follow-up",
                status: "confirmed",
              },
              {
                id: "a2",
                patientName: "Jane Smith",
                time: "10:30 AM",
                type: "New Patient",
                status: "confirmed",
              },
              {
                id: "a3",
                patientName: "Robert Brown",
                time: "2:00 PM",
                type: "Consultation",
                status: "pending",
              },
            ],
          },
          {
            id: "doc2",
            name: "Dr. Michael Chen",
            specialty: "Cardiology",
            selected: false,
            appointments: [
              {
                id: "a4",
                patientName: "Emily White",
                time: "8:30 AM",
                type: "Routine Check",
                status: "confirmed",
              },
              {
                id: "a5",
                patientName: "David Lee",
                time: "11:00 AM",
                type: "Follow-up",
                status: "confirmed",
              },
            ],
          },
          {
            id: "doc3",
            name: "Dr. Lisa Wong",
            specialty: "Nephrology",
            selected: false,
            appointments: [
              {
                id: "a6",
                patientName: "Thomas Gray",
                time: "9:30 AM",
                type: "Dialysis",
                status: "confirmed",
              },
              {
                id: "a7",
                patientName: "Maria Garcia",
                time: "1:00 PM",
                type: "Consultation",
                status: "pending",
              },
            ],
          },
          {
            id: "doc4",
            name: "Dr. James Wilson",
            specialty: "Neurology",
            selected: false,
            appointments: [
              {
                id: "a8",
                patientName: "Sarah Miller",
                time: "10:00 AM",
                type: "MRI Review",
                status: "confirmed",
              },
              {
                id: "a9",
                patientName: "Kevin Davis",
                time: "3:00 PM",
                type: "Follow-up",
                status: "confirmed",
              },
              {
                id: "a10",
                patientName: "Amy Taylor",
                time: "4:30 PM",
                type: "New Patient",
                status: "pending",
              },
            ],
          },
        ],
      },
      {
        id: "pain-management",
        name: "Pain Management",
        expanded: false,
        doctors: [
          {
            id: "doc5",
            name: "Dr. Amanda Scott",
            specialty: "Pain Management",
            selected: false,
            appointments: [
              {
                id: "a11",
                patientName: "Brian Clark",
                time: "9:00 AM",
                type: "Therapy",
                status: "confirmed",
              },
              {
                id: "a12",
                patientName: "Olivia Martinez",
                time: "2:30 PM",
                type: "Consultation",
                status: "confirmed",
              },
            ],
          },
        ],
      },
      {
        id: "surgery",
        name: "Surgery",
        expanded: false,
        doctors: [
          {
            id: "doc6",
            name: "Dr. Richard Kim",
            specialty: "General Surgery",
            selected: false,
            appointments: [
              {
                id: "a13",
                patientName: "Daniel Harris",
                time: "8:00 AM",
                type: "Pre-op",
                status: "confirmed",
              },
              {
                id: "a14",
                patientName: "Sophia Lewis",
                time: "12:00 PM",
                type: "Post-op",
                status: "confirmed",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ancillary",
    name: "Ancillary",
    expanded: false,
    children: [
      {
        id: "radiology",
        name: "Radiology",
        expanded: false,
        doctors: [
          {
            id: "doc7",
            name: "Dr. Patricia Moore",
            specialty: "Radiology",
            selected: false,
            appointments: [
              {
                id: "a15",
                patientName: "George Allen",
                time: "9:00 AM",
                type: "X-ray",
                status: "confirmed",
              },
              {
                id: "a16",
                patientName: "Karen Young",
                time: "11:00 AM",
                type: "CT Scan",
                status: "confirmed",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default function UsersPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selectedDoctors, setSelectedDoctors] = useState<Doctor[]>([]);

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, expanded: !cat.expanded } : cat
      )
    );
  };

  // Toggle sub-category expansion
  const toggleSubCategory = (categoryId: string, subCategoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            children: cat.children.map((sub) =>
              sub.id === subCategoryId
                ? { ...sub, expanded: !sub.expanded }
                : sub
            ),
          };
        }
        return cat;
      })
    );
  };

  // Toggle individual doctor selection
  const toggleDoctor = (
    categoryId: string,
    subCategoryId: string,
    doctorId: string
  ) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            children: cat.children.map((sub) => {
              if (sub.id === subCategoryId) {
                return {
                  ...sub,
                  doctors: sub.doctors.map((doc) => {
                    if (doc.id === doctorId) {
                      const updatedDoc = { ...doc, selected: !doc.selected };
                      // Update selected doctors list
                      if (updatedDoc.selected) {
                        setSelectedDoctors((prev) => [...prev, updatedDoc]);
                      } else {
                        setSelectedDoctors((prev) =>
                          prev.filter((d) => d.id !== doctorId)
                        );
                      }
                      return updatedDoc;
                    }
                    return doc;
                  }),
                };
              }
              return sub;
            }),
          };
        }
        return cat;
      })
    );
  };

  // Select all doctors in a sub-category
  const selectAllDoctors = (categoryId: string, subCategoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            children: cat.children.map((sub) => {
              if (sub.id === subCategoryId) {
                const allSelected = sub.doctors.every((d) => d.selected);
                const updatedDoctors = sub.doctors.map((doc) => ({
                  ...doc,
                  selected: !allSelected,
                }));

                // Update selected doctors list
                if (!allSelected) {
                  setSelectedDoctors((prev) => {
                    const currentIds = new Set(prev.map((d) => d.id));
                    const newDoctors = updatedDoctors.filter(
                      (d) => !currentIds.has(d.id)
                    );
                    return [...prev, ...newDoctors];
                  });
                } else {
                  setSelectedDoctors((prev) =>
                    prev.filter(
                      (d) => !updatedDoctors.some((ud) => ud.id === d.id)
                    )
                  );
                }

                return { ...sub, doctors: updatedDoctors };
              }
              return sub;
            }),
          };
        }
        return cat;
      })
    );
  };

  // Get status color
  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex h-full bg-gray-50 text-black">
      {/* Fixed Sidebar */}
      <div className="w-80 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Appointment Management</h2>
        </div>

        <div className="p-4">
          {categories.map((category, catIndex) => (
            <div key={category.id} className="mb-2">
              {/* Main Category */}
              <div
                className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                onClick={() => toggleCategory(category.id)}
              >
                {category.expanded ? (
                  <ChevronDown className="w-4 h-4 mr-2" />
                ) : (
                  <ChevronRight className="w-4 h-4 mr-2" />
                )}
                <span className="font-medium">{category.name}</span>
              </div>

              {/* Sub-categories with connecting lines */}
              {category.expanded &&
                category.children.map((subCategory, subIndex) => (
                  <div key={subCategory.id} className="ml-6 relative">
                    {/* Vertical connecting line */}
                    <div className="absolute left-[-9px] top-0 bottom-0 w-px bg-gray-500"></div>

                    {/* Sub-category header */}
                    <div className="relative flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                      {/* Horizontal connecting line */}
                      <div className="absolute -left-2 top-1/2 w-4 h-px bg-gray-500"></div>
                      <div
                        className="flex items-center"
                        onClick={() =>
                          toggleSubCategory(category.id, subCategory.id)
                        }
                      >
                        {subCategory.expanded ? (
                          <ChevronDown className="w-4 h-4 mr-2" />
                        ) : (
                          <ChevronRight className="w-4 h-4 mr-2" />
                        )}
                        <span className="text-sm font-medium">
                          {subCategory.name}
                        </span>
                      </div>
                    </div>

                    {/* Doctors list with checkboxes */}
                    {subCategory.expanded && (
                      <div className="ml-6 relative">
                        {/* Vertical line extended */}
                        <div className="absolute left-[-9px] top-0 bottom-0 w-px bg-gray-500"></div>

                        {/* Select All option */}
                        <div className="relative flex items-center p-2 hover:bg-gray-50 rounded">
                          <div className="absolute left-0 top-1/2 w-3 h-px bg-gray-300"></div>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={subCategory.doctors.every(
                                (d) => d.selected
                              )}
                              onChange={() =>
                                selectAllDoctors(category.id, subCategory.id)
                              }
                              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">
                              Select All
                            </span>
                          </label>
                        </div>

                        {/* Individual doctors */}
                        {subCategory.doctors.map((doctor, docIndex) => (
                          <div
                            key={doctor.id}
                            className="relative flex items-center p-2 hover:bg-gray-50 rounded"
                          >
                            {/* Horizontal line for each doctor */}
                            {docIndex < subCategory.doctors.length - 1 && (
                              <div className="absolute -left-2 top-1/2 w-7 h-px bg-gray-500"></div>
                            )}
                            <label className="flex items-center cursor-pointer ml-4">
                              <input
                                type="checkbox"
                                checked={doctor.selected}
                                onChange={() =>
                                  toggleDoctor(
                                    category.id,
                                    subCategory.id,
                                    doctor.id
                                  )
                                }
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="ml-2 text-sm">
                                {doctor.name}
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200 bg-white">
          <h1 className="text-2xl font-bold">Appointments</h1>
          <p className="text-gray-600 mt-1">
            {selectedDoctors.length === 0
              ? "Select doctors to view their appointments"
              : `Showing appointments for ${selectedDoctors.length} doctor(s)`}
          </p>
        </div>

        {/* Appointments Grid with Horizontal Scroll */}
        <div className="flex-1 overflow-x-auto p-6">
          {selectedDoctors.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-4">👨‍⚕️</div>
                <p className="text-lg">
                  Select doctors from the sidebar to view their appointments
                </p>
              </div>
            </div>
          ) : (
            <div className="flex gap-6 min-w-max">
              {selectedDoctors.map((doctor) => (
                <div key={doctor.id} className="w-80 flex-shrink-0">
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    {/* Doctor Header */}
                    <div className="p-4 border-b border-gray-200 bg-blue-50">
                      <h3 className="font-semibold text-lg">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">
                        {doctor.specialty}
                      </p>
                      <div className="mt-2 flex items-center">
                        <Check className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-sm text-gray-600">
                          {doctor.appointments.length} appointment(s)
                        </span>
                      </div>
                    </div>

                    {/* Appointments List */}
                    <div className="p-4">
                      {doctor.appointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="mb-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">
                                {appointment.patientName}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {appointment.type}
                              </p>
                            </div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                appointment.status
                              )}`}
                            >
                              {appointment.status}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <span className="font-medium">Time:</span>
                            <span className="ml-2">{appointment.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
