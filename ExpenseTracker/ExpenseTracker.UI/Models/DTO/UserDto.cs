namespace ExpenseTracker.UI.Models.DTO
{
    public class UserDto
    {
        public int UserID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string? ProfilePicture { get; set; }
        public string CreatedAtFormatted => CreatedAt.ToString("yyyy-MM-dd"); // Formatted for better display
        public string UpdatedAtFormatted => UpdatedAt.ToString("yyyy-MM-dd");

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
