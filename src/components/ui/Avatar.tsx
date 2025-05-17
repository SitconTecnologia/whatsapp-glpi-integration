import React from 'react';
import { cn } from '../../lib/utils';
import { getInitials } from '../../lib/utils';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ 
  src, 
  alt = 'Avatar',
  name, 
  size = 'md',
  className 
}: AvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-base',
  };

  return (
    <div className={cn(
      'relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-200 text-gray-700',
      sizeClasses[size],
      className
    )}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      ) : name ? (
        <span className="font-medium">{getInitials(name)}</span>
      ) : (
        <span className="font-medium">??</span>
      )}
    </div>
  );
}