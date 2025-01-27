using ExpenseTracker.API.Models.Domain;
using Microsoft.AspNetCore.Identity;

namespace ExpenseTracker.API.Models.DTO
{
    public class GoalDto
    {
        public int GoalID { get; set; }
        public string UserID { get; set; } // Updated to string for IdentityUser's Id
        public decimal TargetAmount { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }

        // Relationship
        public IdentityUser User { get; set; } // Updated to use IdentityUser
    }
}
