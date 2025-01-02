using ExpenseTracker.API.Data;
using ExpenseTracker.API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.API.Repositories
{
    public class SQLAuditLogRepository : IAuditLogRepository
    {
        private readonly ExpenseTrackerDbContext dbContext;

        public SQLAuditLogRepository(ExpenseTrackerDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<AuditLog> CreateAsync(AuditLog auditLog)
        {
            await dbContext.AuditLogs.AddAsync(auditLog);
            await dbContext.SaveChangesAsync();
            return auditLog;
        }

        public async Task<AuditLog> DeleteAsync(int id)
        {
            var existingAuditLog = await dbContext.AuditLogs.FirstOrDefaultAsync(x => x.AuditLogID == id);

            if (existingAuditLog == null)
            {
                return null;
            }

            dbContext.AuditLogs.Remove(existingAuditLog);

            await dbContext.SaveChangesAsync();

            return existingAuditLog;
        }

        public async Task<List<AuditLog>> GetAllAsync()
        {
            return await dbContext.AuditLogs.Include("User").ToListAsync();
        }

        public async Task<AuditLog?> GetByIdAsync(int id)
        {
            return await dbContext.AuditLogs
                .Include("User")
                .FirstOrDefaultAsync(x => x.AuditLogID == id);
        }

        public async Task<AuditLog?> UpdateAsync(int id, AuditLog auditLog)
        {
            var existingAuditLog = await dbContext.AuditLogs.FirstOrDefaultAsync(x => x.AuditLogID == id);

            if (existingAuditLog == null)
            {
                return null;
            }

            existingAuditLog.UserID = auditLog.UserID;
            existingAuditLog.Action = auditLog.Action;
            existingAuditLog.Timestamp = auditLog.Timestamp;

            await dbContext.SaveChangesAsync();

            return existingAuditLog;
        }
    }
}
