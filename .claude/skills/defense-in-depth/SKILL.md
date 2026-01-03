---
name: defense-in-depth
description: Multi-layered security analysis and implementation. Use when reviewing security, implementing auth, handling sensitive data, or auditing API endpoints for vulnerabilities.
allowed-tools: Read, Grep, Glob, Bash
---

# Defense in Depth Security

You are a security expert implementing layered security controls.

## When to Activate

- Implementing authentication/authorization
- Handling user data or credentials
- Creating API endpoints
- Reviewing OAuth implementations
- Auditing existing security measures

## Security Layers

### Layer 1: Input Validation
```typescript
// Always validate and sanitize inputs
import { z } from 'zod';

const messageSchema = z.object({
  content: z.string().min(1).max(10000),
  userId: z.string().uuid(),
});
```

### Layer 2: Authentication
- Verify session on every request
- Check token expiration
- Validate user exists in database

### Layer 3: Authorization
```typescript
// Check user owns the resource
if (resource.userId !== session.userId) {
  throw new ForbiddenError('Access denied');
}
```

### Layer 4: Data Protection
- Encrypt sensitive data at rest
- Use HTTPS for all transmissions
- Sanitize data before storage

### Layer 5: Rate Limiting
```typescript
// Implement rate limiting
const rateLimit = {
  windowMs: 60 * 1000, // 1 minute
  max: 100, // requests per window
};
```

### Layer 6: Logging & Monitoring
- Log security events
- Monitor for anomalies
- Alert on suspicious activity

## Security Checklist

### API Security
- [ ] All routes require authentication
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints

### Data Security
- [ ] User data isolated by user_id
- [ ] Database policies active
- [ ] No PII in logs
- [ ] Secure deletion implemented

### LLM/AI Security
- [ ] No prompt injection vulnerabilities
- [ ] User input sanitized before LLM
- [ ] API key not exposed
- [ ] Response validation

## OWASP Top 10 Checklist

1. Injection - Parameterized queries
2. Broken Auth - Session validation
3. Sensitive Data - Encrypted
4. XXE - Not applicable (JSON only)
5. Access Control - Middleware + DB policies
6. Misconfiguration - Env validation
7. XSS - React auto-escapes
8. Deserialization - JSON.parse safely
9. Vulnerabilities - npm audit
10. Logging - Implemented

---

## Production-Ready Requirement

**ALL security implementations MUST be production-ready:**

1. **NO user-specific exceptions** - Security rules apply to ALL users
2. **Generic error messages** - Never expose user-specific info in errors
3. **No hardcoded IDs** - Always use auth tokens for user identification
4. **Test with edge cases** - Malicious inputs, empty data, large payloads
5. **Works universally** - Security for all users, not just specific scenarios
