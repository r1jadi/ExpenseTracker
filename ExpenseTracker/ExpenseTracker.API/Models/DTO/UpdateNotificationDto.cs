﻿namespace ExpenseTracker.API.Models.DTO
{
    public class UpdateNotificationDto
    {
        public string UserID { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
        public bool IsRead { get; set; }
        public string Type { get; set; }
    }
}
