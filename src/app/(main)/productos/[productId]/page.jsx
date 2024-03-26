'use client'

import React, { useState, useEffect } from 'react';
import useCategoryId from '@/components/hooks/useCategoryId';
import { getCategories } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';


export default function page() {
  const categoryId = useCategoryId();

  return (
    <div>product page</div>
  )
}
