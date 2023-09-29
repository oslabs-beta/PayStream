'use client';
import React, { useState } from 'react';
import { PaymentContainer, SearchFilter } from '@/components';
import { Heading, Text, Card, Box } from '@radix-ui/themes';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { projects, payRange, test } from '@/hardcoded';
import { SearchFilterProps } from '@/lib/types';

export const Dashboard = () => {
  const [selectedProject, setSelectedProject] = React.useState('');
  const [selectedDueDate, setSelectedDueDate] = React.useState('');

  const handleFilterProject = (project: string) => {
    setSelectedProject(project);
  };

  const handleFilterDueDate = (dueDate: string) => {
    setSelectedDueDate(dueDate);
  };

  const filteredPayments = test.filter((payment) => {
    if (selectedProject && payment.project_name !== selectedProject) {
      console.log(selectedProject);
      return false;
    }

    if (selectedDueDate && payment.invoice_due_date !== selectedDueDate) {
      console.log(selectedDueDate);
      return false;
    }

    return true;
  });

  return (
    <div className='flex h-5/6 flex-col items-center justify-center gap-4'>
      <div className='flex flex-row items-center justify-center gap-4'>
        <Heading>Upcoming Payments</Heading>
        <Text>Filter by:</Text>
        <SearchFilter
          title='projects'
          options={projects}
          onFilter={handleFilterProject}
        />
        <SearchFilter
          title='payRange'
          options={payRange}
          onFilter={handleFilterDueDate}
        />
      </div>

      <div>
        {filteredPayments.map((p) => (
          <PaymentContainer payment={p} key={p.invoice_id}></PaymentContainer>
        ))}
      </div>
    </div>
  );
};
