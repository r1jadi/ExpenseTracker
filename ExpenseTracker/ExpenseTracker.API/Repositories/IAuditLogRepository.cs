using ExpenseTracker.API.Models.Domain;

namespace ExpenseTracker.API.Repositories
{
    public interface IAuditLogRepository
    {
        Task<List<AuditLog>> GetAllAsync();

        Task<AuditLog?> GetByIdAsync(int id);

        Task<AuditLog> CreateAsync(AuditLog auditLog);

        Task<AuditLog?> UpdateAsync(int id, AuditLog auditLog);

        Task<AuditLog> DeleteAsync(int id);
    }
}
