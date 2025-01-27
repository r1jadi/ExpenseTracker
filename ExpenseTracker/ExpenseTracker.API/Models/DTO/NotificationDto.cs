using ExpenseTracker.API.Models.Domain;
using Microsoft.AspNetCore.Identity;

namespace ExpenseTracker.API.Models.DTO
{
    public class NotificationDto
    {
        public int NotificationID { get; set; }
        public string UserID { get; set; } // Updated to string for IdentityUser's Id
        public string Message { get; set; }
        public DateTime Date { get; set; }
        public bool IsRead { get; set; }
        public string Type { get; set; }

        // Relationship
        public IdentityUser User { get; set; } // Updated to use IdentityUser
    }
}
