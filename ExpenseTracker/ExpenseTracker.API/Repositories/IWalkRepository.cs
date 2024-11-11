﻿using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Repositories
{
    public interface IWalkRepository
    {
       Task<Walk> CreateAsync(Walk walk);

        Task<List<Walk>>GetAllAsync();

        Task<Walk?> GetByIdAsync(Guid id);
    }
}
